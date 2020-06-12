let rooms = [
	{
		name: 'general',
		users: {
			P3t_jo_Tf92WfPNbAAAA: "Agneta",
			loeKz1sJZY_maPq_AAAC: "Camilla",
		},
	},
	{
		name: 'lieutenant',
		users: {
			BKXyzY_LJsRMhTCyAAAB: "Bengt",
			W6bBlPtrOOnSFxtsAAAD: "David",
		},
	},
];

function findRoomByUserId(id) {
	return rooms.find(room => room.users.hasOwnProperty(id))
}

let bengtsRoom = findRoomByUserId('BKXyzY_LJsRMhTCyAAAB');
let camillasRoom = findRoomByUserId('loeKz1sJZY_maPq_AAAC');

console.log({
	bengtsRoom,
	camillasRoom,
});
