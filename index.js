'use strict';
const alfy = require('alfy');
const got = require('got');

got('https://api.npms.io/search', {
	json: true,
	query: {
		term: alfy.input,
		size: 20
	}
})
.then(res => {
	const items = res.body.results
		.filter(x => x.module.name.length > 1)
		.map(x => {
			const module = x.module;

			return {
				title: module.name,
				subtitle: module.description,
				arg: module.links.repository || module.links.npm,
				mods: {
					alt: {
						arg: module.links.npm,
						subtitle: 'Open the npm page instead of the GitHub repo'
					}
				},
				quicklookurl: module.links.repository && `${module.links.repository}#readme`
			};
		});

	alfy.output(items);
});
