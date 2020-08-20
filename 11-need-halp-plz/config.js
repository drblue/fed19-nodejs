/**
 * Backend config
 */

module.exports = {
	PASSWORD_HASH_ROUNDS: parseInt(process.env.PASSWORD_HASH_ROUNDS) || 10,
}
