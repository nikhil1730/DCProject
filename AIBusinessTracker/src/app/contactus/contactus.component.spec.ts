import { TestBed, inject } from '@angular/core/testing';

import { ContactUsComponent } from './contactus.component';

describe('a contactus component', () => {
	let component: ContactUsComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ContactUsComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ContactUsComponent], (ContactUsComponent) => {
		component = ContactUsComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});