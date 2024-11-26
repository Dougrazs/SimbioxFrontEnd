export default function Select() {
  return (
    <div className={'text-black'}>
      <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Buscar por gênero</label>
      <select id="countries" className="w-full border p-2 rounded">
        <option value="" selected>Choose a country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
    </div>
  );
}
