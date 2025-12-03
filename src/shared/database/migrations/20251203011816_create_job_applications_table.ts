import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('job_applications', (table) => {
    table.increments('id').primary()
    table.integer('job_id').unsigned().notNullable()
    table.foreign('job_id').references('id').inTable('jobs').onDelete('CASCADE')
    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.string('name', 150).notNullable()
    table.string('email', 150).nullable()
    table.string('phone', 20).nullable()
    table.string('education', 600).notNullable()
    table.string('experience', 600).notNullable()
    table.timestamps(true, true)
    table.unique(['job_id', 'user_id'])
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('job_applications')
}
