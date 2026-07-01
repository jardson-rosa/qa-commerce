import Ajv from 'ajv'

const ajv = new Ajv({ allErrors: true })

export function validarSchema(schema, dados) {
  const valida = ajv.compile(schema)
  const ok = valida(dados)
  expect(ok, JSON.stringify(valida.errors, null, 2)).to.be.true
}