import MenuDefault from '../../src/components/utils/MenuDefault'

const Color = () => {

    return (
      <MenuDefault 
        firstName={'Início'} firstRoute={'/'} 
        secondName={'Estoque'} secondRoute={'/stock'}
        thirthName={'Cores'} thirthRoute={'/stock/colors'}
        fourthName={'Cor'} fourthRoute={'/stock/color'}>
        
      </MenuDefault>
    )
}

export default Color