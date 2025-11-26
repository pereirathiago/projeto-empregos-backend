import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('jobs', (table) => {
    table.increments('id').primary()
    table.integer('company_id').unsigned().notNullable()
    table.foreign('company_id').references('id').inTable('users').onDelete('CASCADE')
    table.string('title', 150).notNullable()
    table.string('area', 100).notNullable()
    table.text('description').notNullable()
    table.string('state', 2).notNullable()
    table.string('city', 150).notNullable()
    table.decimal('salary', 10, 2).nullable()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('jobs')
}
