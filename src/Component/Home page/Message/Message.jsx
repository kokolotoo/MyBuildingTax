

const Message = ({houseMenager, cashier}) => {
  return (
    <div>
          <fieldset >
              <legend>Домоуправител</legend>
              <section style={{ textAlign: 'center', padding: '0.3em' }}>
                  <b style={{ color: 'red' }}>{houseMenager.name}</b>
                  <p>телефон: <b style={{ color: 'red' }}>{houseMenager.pfone}</b></p>
                  <p>апартамент: <b style={{ color: 'red' }}>{houseMenager.apartment}</b></p>
              </section>
          </fieldset>
          <fieldset >
              <legend>Касиер</legend>
              <section style={{ textAlign: 'center', padding: '0.3em' }}>
                  <b style={{ color: 'red' }}>{cashier.name}</b>
                  <p>телефон: <b style={{ color: 'red' }}>{cashier.pfone}</b></p>
                  <p>апартамент: <b style={{ color: 'red' }}>{cashier.apartment}</b></p>
              </section>
          </fieldset>
    </div>
  )
}

export default Message
