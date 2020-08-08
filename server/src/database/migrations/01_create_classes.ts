import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary()
        table.string('subject').notNullable()
        table.decimal('cost').notNullable()

        // Relacionamento
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE') // Deleta todas as aulas relacionadas ao professor caso o professor seja deletado.
            .onUpdate('CASCADE') // Se o ID for alterado o valor é refletido 
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('classes')
}