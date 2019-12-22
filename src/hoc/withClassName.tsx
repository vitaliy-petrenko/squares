import React from 'react'

interface IWithClassNameProps {
  className?: string
}

const withClassName = <P extends object>(Component: React.ComponentType<P>) => {
  const WithClassName: React.FC<P & IWithClassNameProps> = ({ className, ...props }) => {
    return (
      <div className={className}>
        <Component {...props as P} />
      </div>
    )
  }

  return WithClassName
}

export default withClassName
