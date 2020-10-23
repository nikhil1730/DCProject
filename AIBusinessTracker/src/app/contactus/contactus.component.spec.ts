import { TestBed, inject } from '@angular/core/testing';

import { ContactusComponent } from './contactus.component';

describe('a contactus component', () => {
	let component: ContactusComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ContactusComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ContactusComponent], (ContactusComponent) => {
		component = ContactusComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});