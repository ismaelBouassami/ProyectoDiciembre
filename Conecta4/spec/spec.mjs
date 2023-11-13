import { CrearTablero } from "../src/Reglas/CreateBoard.js";
import { state } from "../src/conecta4.js";


describe('Conecta 4', function () {
    describe('Board',function () {
        it('Create Board',function () {
            const result= CrearTablero(state);

            expect(result).toEqual(jasmine.any(Object));
            expect(result.tablero.length).toEqual(6);
            expect(result.tablero[0].length).toEqual(7);
            expect(result.tablero).toEqual(jasmine.any(Array));

        }); 
    });
});