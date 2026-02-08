"use client";

import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { useServerAction } from "zsa-react";
import { CalendarIcon, Search, Filter, ChevronLeft, ChevronRight, Loader2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrdersAction, type OrderFilters, type OrderWithDetails, type OrdersResponse, updateOrderStatusAction } from "@/lib/actions/orders";
import type { AdminSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  CONFIRMED: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  COMPLETED: "bg-green-500/10 text-green-500 border-green-500/20",
  CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
};

const rentalTypeLabels: Record<string, string> = {
  OUTSTATION: "Outstation",
  LOCAL: "Local",
  AIRPORT: "Airport",
};

interface OrdersPageClientProps {
  session: AdminSession;
}

export default function OrdersPageClient({ session }: OrdersPageClientProps) {
  const [filters, setFilters] = useState<OrderFilters>({
    page: 1,
    limit: 20,
  });
  const [data, setData] = useState<OrdersResponse | null>(null);
  const [pickupDateFrom, setPickupDateFrom] = useState<Date | undefined>();
  const [pickupDateTo, setPickupDateTo] = useState<Date | undefined>();

  const { execute: fetchOrders, isPending } = useServerAction(getOrdersAction);
  const { execute: updateStatus, isPending: isUpdating } = useServerAction(updateOrderStatusAction, {
    onSuccess: () => {
      toast.success("Status updated successfully");
      loadOrders();
    },
    onError: ({ err }) => {
      toast.error(err.message || "Failed to update status");
    },
  });

  const loadOrders = useCallback(async () => {
    const [result, error] = await fetchOrders({
      ...filters,
      pickupDateFrom: pickupDateFrom?.toISOString().split("T")[0],
      pickupDateTo: pickupDateTo?.toISOString().split("T")[0],
    });

    if (error) {
      console.error("Failed to fetch orders:", error);
      return;
    }

    if (result) {
      setData(result);
    }
  }, [filters, pickupDateFrom, pickupDateTo, fetchOrders]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleFilterChange = (key: keyof OrderFilters, value: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
      page: 1,
    }));
  };

  const clearFilters = () => {
    setFilters({ page: 1, limit: 20 });
    setPickupDateFrom(undefined);
    setPickupDateTo(undefined);
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    await updateStatus({ orderId, status: newStatus as "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" });
  };

  const getCityInfo = (order: OrderWithDetails): string => {
    if (order.outstationDetails) {
      return `${order.outstationDetails.pickupCity} → ${order.outstationDetails.destinationCity}`;
    }
    if (order.localDetails) {
      return `${order.localDetails.pickupCity} → ${order.localDetails.destinationCity}`;
    }
    if (order.airportDetails) {
      return `${order.airportDetails.city} (${order.airportDetails.airportName})`;
    }
    return "-";
  };

  const hasWriteAccess = session.access === "WRITE";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orders</h1>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={cn("text-xs h-9 bg-green-500 text-white font-bold", {
            "bg-yellow-300 text-black": session.access !== 'WRITE'
          })}>
            Access: {session.access}
          </Badge>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bookingId">Booking ID</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="bookingId"
                  placeholder="Search booking ID..."
                  value={filters.bookingId || ""}
                  onChange={(e) => handleFilterChange("bookingId", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phoneNumber"
                  placeholder="Search phone..."
                  value={filters.phoneNumber || ""}
                  onChange={(e) => handleFilterChange("phoneNumber", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="city"
                  placeholder="Search city..."
                  value={filters.city || ""}
                  onChange={(e) => handleFilterChange("city", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Rental Type</Label>
              <Select
                value={filters.rentalType || "all"}
                onValueChange={(value) =>
                  handleFilterChange("rentalType", value === "all" ? undefined : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="OUTSTATION">Outstation</SelectItem>
                  <SelectItem value="LOCAL">Local</SelectItem>
                  <SelectItem value="AIRPORT">Airport</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={filters.status || "all"}
                onValueChange={(value) =>
                  handleFilterChange("status", value === "all" ? undefined : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Pickup Date From</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !pickupDateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {pickupDateFrom ? format(pickupDateFrom, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={pickupDateFrom}
                    onSelect={setPickupDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Pickup Date To</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !pickupDateTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {pickupDateTo ? format(pickupDateTo, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={pickupDateTo}
                    onSelect={setPickupDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>All Orders</span>
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Car Type</TableHead>
                    <TableHead>Route/City</TableHead>
                    <TableHead>Pickup Date</TableHead>
                    <TableHead>Pickup Time</TableHead>
                    <TableHead>Created</TableHead>
                    {hasWriteAccess && <TableHead>Action</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={hasWriteAccess ? 10 : 9} className="h-24 text-center">
                        No orders found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    data?.orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.bookingId}</TableCell>
                        <TableCell>{rentalTypeLabels[order.rentalType]}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusColors[order.status]}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.phoneNumber}</TableCell>
                        <TableCell>{order.carType}</TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {getCityInfo(order)}
                        </TableCell>
                        <TableCell>{format(new Date(order.pickupDate), "MMM dd, yyyy")}</TableCell>
                        <TableCell>{order.pickupTime}</TableCell>
                        <TableCell>{format(new Date(order.createdAt), "MMM dd, HH:mm")}</TableCell>
                        {hasWriteAccess && (
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" disabled={isUpdating}>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {order.status !== "PENDING" && (
                                  <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "PENDING")}>
                                    Mark as Pending
                                  </DropdownMenuItem>
                                )}
                                {order.status !== "CONFIRMED" && (
                                  <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "CONFIRMED")}>
                                    Mark as Confirmed
                                  </DropdownMenuItem>
                                )}
                                {order.status !== "COMPLETED" && (
                                  <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "COMPLETED")}>
                                    Mark as Completed
                                  </DropdownMenuItem>
                                )}
                                {order.status !== "CANCELLED" && (
                                  <DropdownMenuItem
                                    onClick={() => handleStatusUpdate(order.id, "CANCELLED")}
                                    className="text-red-600"
                                  >
                                    Mark as Cancelled
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {data && data.totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {((data.page - 1) * data.limit) + 1} to {Math.min(data.page * data.limit, data.total)} of{" "}
                  {data.total} orders
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(data.page - 1)}
                    disabled={data.page <= 1 || isPending}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Page {data.page} of {data.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(data.page + 1)}
                    disabled={data.page >= data.totalPages || isPending}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
