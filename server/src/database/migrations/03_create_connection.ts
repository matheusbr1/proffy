import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary()

        // Relacionamento
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE') // Deleta todas as aulas relacionadas ao professor caso o professor seja deletado.
            .onUpdate('CASCADE') // Se o ID for alterado o valor é refletido 

        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('connections')
}