import { db } from '../db/database.js';

export async function findById(id) {
	return db
	.execute('SELECT * FROM users WHERE id=?',[id])
	.then((result) => result[0][0]);
}

export async function findByintraId(intraId) {
	return db
	.execute('SELECT * FROM users WHERE intraId=?',[intraId])
	.then((result) => result[0][0]);
}

export async function createUser(user) {
	const {intraId, pw, email, url} = user;
	return db
	.execute('INSERT INTO users (intraId, pw, email, url) VALUES (?,?,?,?)',
	[intraId, pw, email, url]
	)
	.then((result) => result[0].insertId);
}