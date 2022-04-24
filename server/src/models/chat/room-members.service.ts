import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomMembersService {
	private onlineMembers: any = [];

	/**
	 * Add new member to the list
	 * @param {socketId, email} - member data
	 * @returns member if added || null
	 */
	addMember({ socketId, email }) {
		// Validate data
		if (!socketId || !email) {
			return null;
		}
		// Clean data
		email = email.trim().toLowerCase();

		//? Check if already exists
		const existingMember = this.onlineMembers.find(
			member => member.socketId === socketId && member.email === email,
		);

		if (existingMember) {
			return null;
		}

		//* Add the member
		const member = { socketId, email };

		this.onlineMembers.push(member);

		return member;
	}

	/**
	 * Remove member from the list
	 * @param socketId
	 * @returns removed member if removed || null
	 */
	removeMember(socketId: string) {
		const index = this.onlineMembers.findIndex(
			member => member.socketId === socketId,
		);

		if (index !== -1) {
			return this.onlineMembers.splice(index, 1)[0];
		} else {
			return null;
		}
	}
}
