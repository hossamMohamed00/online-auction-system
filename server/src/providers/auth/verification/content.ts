// TEMPLATE TO BE CHANGED
export const getEmailContent = (
	firstName: string,
	verificationLink: string,
): string => {
	return `Hello ${firstName}, <br><br> Please verify your <a href="${verificationLink}">account</a>. Thanks!`;
};
