import React from 'react'
import { GridProvider } from '../contextProviders/GridProvider'

interface IHocProps {
}

const withGridContext = <P extends object>(Component: React.ComponentType<P>) => {
  const
    HocComponent: React.FC<P & IHocProps> = ({ ...props }) => {
      return (
        <GridProvider>
          <Component {...props as P} />
        </GridProvider>
      )
    }

  return HocComponent
}

export default withGridContext
