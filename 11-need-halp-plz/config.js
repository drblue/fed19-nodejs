/**
 * Backend config
 */

module.exports = {
	PASSWORD_HASH_ROUNDS: process.env.PASSWORD_HASH_ROUNDS || 10,
}
