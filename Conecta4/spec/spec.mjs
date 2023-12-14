import { CrearTablero } from "../src/Reglas/CreateBoard.js";
import { state } from "../src/gameViews/conecta4.js";
import {mostrarFicha} from "../src/Reglas/MostrarFichaATirar.js";


describe('Conecta 4', function () {
    describe('Board',function () {
        it('Create Board',function () {
            const result= CrearTablero(state);

            expect(result).toEqual(jasmine.any(Object));
            expect(result.tablero.length).toEqual(6);
            expect(result.tablero[0].length).toEqual(7);
            expect(result.tablero).toEqual(jasmine.any(Array));

        }); 
       
          it('should initialize overCasilla with a nested array of length 7 filled with 0s', function() {
            const state = mostrarFicha({});
            expect(state.overCasilla.length).toBe(1);
            expect(state.overCasilla[0].length).toBe(7);
            expect(state.overCasilla[0]).toEqual([0, 0, 0, 0, 0, 0, 0]);
          });
    });
});