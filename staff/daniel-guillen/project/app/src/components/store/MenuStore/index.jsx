import { useNavigate } from 'react-router-dom'
// components
import { Button } from '../../core'

const MenuStore = () => {
  const navigate = useNavigate()

  return (
    <div className='menuFooterDiv'>
      <ul className='menuFooter'>
        <li>
          <Button 
            className='menuFooter-start' 
            onClick={() => navigate('/Store')}
          >
            🔙
          </Button>
        </li>
        <li>
          <Button 
            className='menuFooter-center' 
            onClick={() => navigate('/StoreWaste/storedwaste')}
          >
            📦
          </Button>
        </li>
        <li>
          <Button 
            className='menuFooter-center' 
            onClick={() => navigate('/StoreWaste/storedwastesummary')}
          >
            📊
          </Button>
        </li>
        <li>
          <Button 
            className='menuFooter-end' 
            onClick={() => navigate('/StoreWaste/searchstoredwaste')}
          >
            🔎
          </Button>
        </li>
      </ul>
    </div>
  )
}

export default MenuStore
