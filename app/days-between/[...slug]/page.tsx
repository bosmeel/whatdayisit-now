export default function Page({ params }: any) {

  return (
    <main style={{padding:40,fontFamily:"sans-serif"}}>
      <h1>ROUTE TEST</h1>

      <pre>
        {JSON.stringify(params, null, 2)}
      </pre>

    </main>
  )
}