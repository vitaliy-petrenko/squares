import React from 'react'
import { GridProvider } from '../contextProviders/GridProvider'

interface IHocProps {
}

const withGridContext = <P extends object>(Component: React.ComponentType<P>) => {
  const
    WithGridContext: React.FC<P & IHocProps> = ({ ...props }) => (
      <GridProvider>
        <Component {...props as P} />
      </GridProvider>
    )

  return WithGridContext
}

export default withGridContext
