import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary()

        table.integer('week_day').notNullable()
        table.integer('from').notNullable()
        table.integer('to').notNullable()

        // Relacionamento
        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onDelete('CASCADE') // Deleta todas as aulas relacionadas ao professor caso o professor seja deletado.
            .onUpdate('CASCADE') // Se o ID for alterado o valor é refletido 
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('class_schedule')
}