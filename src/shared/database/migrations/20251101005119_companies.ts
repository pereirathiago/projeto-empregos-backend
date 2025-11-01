import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('companies', (table) => {
    table.increments('id').primary()
    table.integer('user_id').unsigned().notNullable().unique()
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.string('business', 150).notNullable()
    table.string('street', 150).notNullable()
    table.string('number', 8).notNullable()
    table.string('city', 150).notNullable()
    table.string('state', 2).notNullable()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('companies')
}
