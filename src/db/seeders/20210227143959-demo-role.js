module.exports = {
	up: (queryInterface /* , Sequelize */) => {
		return queryInterface.bulkInsert('role', [
			{
				id: 1,
				name: 'Admin',
				description: 'some description',
				created_date_time: new Date(),
				modified_date_time: new Date(),
			},
		
			{
				id :2,
				name: 'User',
				description: 'some description',
				created_date_time: new Date(),
				modified_date_time: new Date(),
			},
		]);
	},
	down: (queryInterface /* , Sequelize */) => {
		return queryInterface.bulkDelete('role', null, {});
	},
};
