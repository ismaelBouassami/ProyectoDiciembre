import { CrearTablero } from "../Reglas/CreateBoard.js";
import { state } from "../conecta4.js";
import { ComprobarJugador } from "../Reglas/ComprobarJugador.js";
import { overCasilla } from "../conecta4.js";
import { comprobarGanador } from "../Reglas/Win.js";
import { reiniciarTablero } from "../Reglas/RebootGame.js";

describe('Conecta 4', function () {
    describe('Board',function () {
        it('Create Board',function () {
            const result= CrearTablero(state);
            exepect(result).toBeDefined();
            expect(result).toEqual(jasmine.any(Object));
            expect(result).toBeInstanceOf(Array);
        }); 
    });
});