import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('job_applications', (table) => {
    table.string('feedback', 600).nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('job_applications', (table) => {
    table.dropColumn('feedback')
  })
}
