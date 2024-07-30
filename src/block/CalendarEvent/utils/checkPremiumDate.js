export const checkPremiumDate = status => {
	const date = status?.form?.date;

	const handleCheckStart = new Date(date);

	const sentFormDate = new Date(handleCheckStart).valueOf();

	const now = new Date();


	const today = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate()
	).valueOf();

	let removeDate = false

	if ( (sentFormDate + 604800000) > today) {
		// 7 дней прошли
		removeDate = true
	} 

	return removeDate;
};
