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
		const {jobInput, jobLabel, employerInput, employerLabel, jobStartInput, jobStartLabel, jobEndInput, jobEndLabel, descriptionInput, descriptionLabel} = nodes;
		jobInput.id = jobLabel.htmlFor = "job_" + cardIndex;
		employerInput.id = employerLabel.htmlFor = "employer_" + cardIndex;
		jobStartInput.id = jobStartLabel.htmlFor = "job-start_" + cardIndex;
		jobEndInput.id = jobEndLabel.htmlFor = "job-end_" + cardIndex;
		descriptionInput.id = descriptionLabel.htmlFor = "job-descr_" + cardIndex;
	},
	education: (nodes, cardIndex) => {
		const {schoolInput, schoolLabel, degreeInput, degreeLabel, studyStartInput, studyStartLabel, studyEndInput, studyEndLabel, descriptionInput, descriptionLabel} = nodes;
		schoolInput.id = schoolLabel.htmlFor = "school_" + cardIndex;
		degreeInput.id = degreeLabel.htmlFor = "degree_" + cardIndex;
		studyStartInput.id = studyStartLabel.htmlFor = "study-start_" + cardIndex;
		studyEndInput.id = studyEndLabel.htmlFor = "study-end_" + cardIndex;
		descriptionInput.id = descriptionLabel.htmlFor = "edu-descr_" + cardIndex;
	},
	reference: (nodes, cardIndex) => {
		const {companyInput, companyLabel, personInput, contactPersonLabel, contactTelInput, contactTelLabel, contactEmailInput, contactEmailLabel} = nodes;
		companyInput.id = companyLabel.htmlFor = "company-name_" + cardIndex;
		personInput.id = contactPersonLabel.htmlFor = "contact-person_" + cardIndex;
		contactTelInput.id = contactTelLabel.htmlFor = "contact-tel_" + cardIndex;
		contactEmailInput.id = contactEmailLabel.htmlFor = "contact-email_" + cardIndex;
	},
	skill: (nodes, cardIndex) => {
		const {skillInput, skillLabel, selectInput, selectLabel} = nodes;
		skillInput.id = skillLabel.htmlFor = "skill_" + cardIndex;
		selectInput.id = selectLabel.htmlFor = "skill-level_" + cardIndex;
	},
};
export {storedCards, params, defaultStrings, addAttributes};