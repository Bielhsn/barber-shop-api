"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeName = exports.normalizeCity = void 0;
function normalizeString(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase();
}
function normalizeCity(city) {
    return normalizeString(city).substring(0, 15);
}
exports.normalizeCity = normalizeCity;
function normalizeName(name) {
    return normalizeString(name).substring(0, 25);
}
exports.normalizeName = normalizeName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy90ZXh0UGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQVMsZUFBZSxDQUFDLEdBQVc7SUFDbEMsT0FBTyxHQUFHO1NBQ1AsU0FBUyxDQUFDLEtBQUssQ0FBQztTQUNoQixPQUFPLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDO1NBQy9CLFdBQVcsRUFBRSxDQUFDO0FBQ25CLENBQUM7QUFFRCxTQUFnQixhQUFhLENBQUMsSUFBWTtJQUN4QyxPQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFGRCxzQ0FFQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxJQUFZO0lBQ3hDLE9BQU8sZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUZELHNDQUVDIn0=