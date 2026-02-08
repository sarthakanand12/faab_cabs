import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Phone,
  Car,
  MapPin,
  Plane,
  Route,
  Package,
  CircleDot,
  CheckCircle2,
  XCircle,
  Clock3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { type BookingDetails, getBookingByIdAction } from "@/lib/actions/booking-detail";

interface BookingDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const statusConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  PENDING: {
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    icon: <Clock3 className="h-4 w-4" />,
    label: "Pending",
  },
  CONFIRMED: {
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    icon: <CheckCircle2 className="h-4 w-4" />,
    label: "Confirmed",
  },
  COMPLETED: {
    color: "bg-green-500/10 text-green-600 border-green-500/20",
    icon: <CheckCircle2 className="h-4 w-4" />,
    label: "Completed",
  },
  CANCELLED: {
    color: "bg-red-500/10 text-red-600 border-red-500/20",
    icon: <XCircle className="h-4 w-4" />,
    label: "Cancelled",
  },
};

const rentalTypeLabels: Record<string, string> = {
  OUTSTATION: "Outstation Trip",
  LOCAL: "Local Rental",
  AIRPORT: "Airport Transfer",
};

export default async function BookingDetailPage({ params }: BookingDetailPageProps) {
  const { id } = await params;

  let booking: BookingDetails | null = null;
  try {
    const [result] = await getBookingByIdAction({ bookingId: id });
    if (result) {
      booking = result.booking;
    }
  } catch {
    notFound();
  }

  if (!booking) {
    notFound();
  }

  const status = statusConfig[booking.status] || statusConfig.PENDING;

  return (
    <main className="min-h-screen bg-linear-to-br from-primary/5 via-background to-accent/5 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="pl-0 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Booking Details</h1>
              <p className="text-muted-foreground mt-1">Booking ID: {booking.bookingId}</p>
            </div>
            <Badge variant="outline" className={`${status.color} px-4 py-2 text-sm font-medium`}>
              <span className="flex items-center gap-2">
                {status.icon}
                {status.label}
              </span>
            </Badge>
          </div>
        </div>

        <Card className="shadow-lg border-border pt-0 overflow-hidden">
          <CardHeader className="bg-muted/50 border-b pt-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              {booking.rentalType === "OUTSTATION" && <Route className="h-5 w-5 text-primary" />}
              {booking.rentalType === "LOCAL" && <Car className="h-5 w-5 text-primary" />}
              {booking.rentalType === "AIRPORT" && <Plane className="h-5 w-5 text-primary" />}
              {rentalTypeLabels[booking.rentalType]}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pickup Date</p>
                  <p className="font-medium text-foreground">
                    {format(new Date(booking.pickupDate), "EEEE, MMMM do, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pickup Time</p>
                  <p className="font-medium text-foreground">{booking.pickupTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Car className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Car Type</p>
                  <p className="font-medium text-foreground">{booking.carType}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact Number</p>
                  <p className="font-medium text-foreground">{booking.phoneNumber}</p>
                </div>
              </div>
            </div>

            <Separator />

            {booking.rentalType === "OUTSTATION" && booking.outstationDetails && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Route className="h-5 w-5 text-primary" />
                  Trip Details
                </h3>
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <CircleDot className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">From</p>
                      <p className="font-medium">{booking.outstationDetails.pickupCity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">To</p>
                      <p className="font-medium">{booking.outstationDetails.destinationCity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Route className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Trip Type</p>
                      <p className="font-medium">
                        {booking.outstationDetails.tripType === "ONE_WAY" ? "One Way" : "Round Trip"}
                      </p>
                    </div>
                  </div>
                  {booking.outstationDetails.dropDate && (
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Return Date</p>
                        <p className="font-medium">
                          {format(new Date(booking.outstationDetails.dropDate), "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {booking.rentalType === "LOCAL" && booking.localDetails && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  Local Trip Details
                </h3>
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <CircleDot className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Pickup Location</p>
                      <p className="font-medium">{booking.localDetails.pickupCity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Destination</p>
                      <p className="font-medium">{booking.localDetails.destinationCity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Package</p>
                      <p className="font-medium">{booking.localDetails.packageType}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {booking.rentalType === "AIRPORT" && booking.airportDetails && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Plane className="h-5 w-5 text-primary" />
                  Airport Transfer Details
                </h3>
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Plane className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Transfer Type</p>
                      <p className="font-medium">
                        {booking.airportDetails.transferType === "PICKUP_FROM_AIRPORT"
                          ? "Pickup from Airport"
                          : "Drop to Airport"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Airport</p>
                      <p className="font-medium">{booking.airportDetails.airportName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Car className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {booking.airportDetails.transferType === "PICKUP_FROM_AIRPORT"
                          ? "Drop Location"
                          : "Pickup Location"}
                      </p>
                      <p className="font-medium">{booking.airportDetails.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Separator />

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <p>Booked on {format(new Date(booking.createdAt), "MMM dd, yyyy 'at' h:mm a")}</p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          FAAB CABS - Your Trusted Car Partner & Rental Service
        </p>
      </div>
    </main>
  );
}
