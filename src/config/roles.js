const AccessControl = require('accesscontrol');

const ac = new AccessControl();

const roleIds = {
	ADMIN: '1',
	USER: '2',
};

const resources = {
	USERINFO: 'user',
	ROLE: 'role',
	BOOK: 'book'
};

const grantsObject = {
	[roleIds.ADMIN]: {
		[resources.USERINFO]: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
		[resources.ROLE]: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
		[resources.BOOK]: {
			'create:any': ['*'],
			'read:any': ['*'],
			'update:any': ['*'],
			'delete:any': ['*'],
		},
	},
	[roleIds.USER]: {
		[resources.USERINFO]: {
			'create:own': ['*'],
			'read:own': ['*'],
			'update:own': ['*'],
			'delete:own': ['*'],
		},
		[resources.BOOK]: {
			'read:any': ['*'],
		},
	},
};

const roles = (function () {
	ac.setGrants(grantsObject);
	return ac;
})();

module.exports = {
	roles,
	resources,
};
