const storedCards = {
	skill: new Map(),
	reference: new Map(),
	job: new Map(),
	education: new Map(),
};
const params = {
	cardPadding: 4,
	cardHeight: {
		skill: 0,
		reference: 0,
		job: 0,
		education: 0,
	},
	outputHeight: {
		skill: 0,
		reference: 0,
		job: 0,
		education: 0,
	},
	cardIndex: {
		skill: 0,
		reference: 0,
		job: 0,
		education: 0,
	},
	openingIndex: {
		skill: 0,
		reference: 0,
		job: 0,
		education: 0,
	},
};
const defaultStrings = {
	job: {
		0: "Job Title",
		1: "Employer",
	},
	skill: {
		0: "Skill",
		1: "Level",
	},
	reference: {
		0: "Company",
		1: "Person",
	},
	education: {
		0: "School",
		1: "Degree",
	},
};
const addAttributes = {
	job: (nodes, cardIndex) => {
		const {jobInput, jobLabel, employerInput, employerLabel, jobStartInput, jobStartLabel, jobEndInput, jobEndLabel, description, descriptionLabel} = nodes;
		jobInput.id = jobInput.name = jobLabel.htmlFor = "job_" + cardIndex;
		employerInput.id = employerInput.name = employerLabel.htmlFor = "employer_" + cardIndex;
		jobStartInput.id = jobStartInput.name = jobStartLabel.htmlFor = "job-start_" + cardIndex;
		jobEndInput.id = jobEndInput.name = jobEndLabel.htmlFor = "job-end_" + cardIndex;
		description.id = description.name = descriptionLabel.htmlFor = "job-descr_" + cardIndex;
	},
	education: (nodes, cardIndex) => {
		const {schoolInput, schoolLabel, degreeInput, degreeLabel, studyStartInput, studyStartLabel, studyEndInput, studyEndLabel, description, descriptionLabel} = nodes;
		schoolInput.id = schoolInput.name = schoolLabel.htmlFor = "school_" + cardIndex;
		degreeInput.id = degreeInput.name = degreeLabel.htmlFor = "degree_" + cardIndex;
		studyStartInput.id = studyStartInput.name = studyStartLabel.htmlFor = "study-start_" + cardIndex;
		studyEndInput.id = studyEndInput.name = studyEndLabel.htmlFor = "study-end_" + cardIndex;
		description.id = description.name = descriptionLabel.htmlFor = "edu-descr_" + cardIndex;
	},
	reference: (nodes, cardIndex) => {
		const {companyInput, companyLabel, personInput, contactPersonLabel, contactTelInput, contactTelLabel, contactEmailInput, contactEmailLabel} = nodes;
		companyInput.id = companyInput.name = companyLabel.htmlFor = "company-name_" + cardIndex;
		personInput.id = personInput.name = contactPersonLabel.htmlFor = "contact-person_" + cardIndex;
		contactTelInput.id = contactTelInput.name = contactTelLabel.htmlFor = "contact-tel_" + cardIndex;
		contactEmailInput.id = contactEmailInput.name = contactEmailLabel.htmlFor = "contact-email_" + cardIndex;
	},
	skill: (nodes, cardIndex) => {
		const {input, inputLabel, select, selectLabel} = nodes;
		input.id = input.name = inputLabel.htmlFor = "skill_" + cardIndex;
		select.id = select.name = selectLabel.htmlFor = "skill-level_" + cardIndex;
	},
};
export {storedCards, params, defaultStrings, addAttributes};