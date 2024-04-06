import { FallbackProps } from "react-error-boundary"

export const ErrorFallBack = ({ error, resetErrorBoundary }: FallbackProps)  => {
  return  (
    <div role="alert">
      <p>問題が発生しました: </p>
      <pre style={{ color : "red" }}>{ error . message }</pre>
      <button onClick={ resetErrorBoundary }>もう一度お試しください</button>
    </div>
  )
}