import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('error_logs', (table) => {
    table.increments('id').primary()
    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.text('message').notNullable()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('error_logs')
}
