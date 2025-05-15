const bcrypt = require('bcrypt');

(async () => {
    const hash = await bcrypt.hash('password123', 10);
    console.log(hash);
})();
// Este es para generar un hash para la contraseña :')