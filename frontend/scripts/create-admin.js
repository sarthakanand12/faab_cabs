#!/usr/bin/env node

/**
 * Script to create an admin user
 * Usage: node scripts/create-admin.js <username> <password> [access]
 *
 * Example:
 *   node scripts/create-admin.js admin mypassword123 WRITE
 *   node scripts/create-admin.js readonlyadmin mypassword123 READ
 */

const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const { randomUUID } = require('crypto');

require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: node scripts/create-admin.js <username> <password> [access]');
    console.log('  access: READ or WRITE (default: READ)');
    process.exit(1);
  }

  const [username, password, access = 'READ'] = args;

  if (!['READ', 'WRITE'].includes(access)) {
    console.error('Access must be either READ or WRITE');
    process.exit(1);
  }

  const client = await pool.connect();

  try {
    const existingResult = await client.query(
      'SELECT * FROM "Admin" WHERE username = $1',
      [username]
    );

    if (existingResult.rows.length > 0) {
      console.error(`Admin with username "${username}" already exists`);
      process.exit(1);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = randomUUID();
    const result = await client.query(
      'INSERT INTO "Admin" (id, username, password, access, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *',
      [id, username, hashedPassword, access]
    );

    const admin = result.rows[0];

    console.log('✓ Admin created successfully:');
    console.log(`  Username: ${admin.username}`);
    console.log(`  Access: ${admin.access}`);
    console.log(`  ID: ${admin.id}`);
  } catch (error) {
    console.error('Failed to create admin:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
