// "use client"


// export default function Error({error, reset}) {
// const router = useRouter()
// const reload = () => {
// startTransition(() => {
// router.refresh()
// reset()
// })
// }
//   return(
//     <div>{error.message}</div>
//     <button onClick={() => reload()}>Try again</button>
//   )
// }

// Так же, как и loading, нужно создать в нужной директории на нужной странице.
// Возникает, когда есть какая-либо ошибка. Например if(!number) {
// throw new Error("error")
// else:
// return <div>Page</div>}

{/* <ErrorBoundary fallback={<Error />}>
  <Suspense fallback={<Loading />}>
    <ErrorBoundary fallback={<NotFound />}>
      <Page />
    </ErrorBoundary>
  </Suspense>
</ErrorBoundary> */}

// error перехватывает ошибки и дочерних элементов, но не родительских!
// если нужно перехватить ошибку в корневом layout - погугли