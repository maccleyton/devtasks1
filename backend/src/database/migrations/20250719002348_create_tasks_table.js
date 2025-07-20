exports.up = function(knex) {
  return knex.schema.createTable('tasks', table => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.text('description')
    table.string('status').defaultTo('pendente')
    table.date('due_date')
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tasks')
};