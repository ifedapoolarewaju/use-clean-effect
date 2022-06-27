# use-clean-effect

An extended version of React useEffect that is built-in with a simple clean-up function, hence, you may not need to add your own clean-up function when using this.

It also passes an argument to the useEffect callback that indicates if the component has been unmounted or re-rendered. Therefore, making it easy to invoke async functions in your useEffect callback and avoid memory leaks and removing the need for you to add a clean-up function.

## Installation

```sh
npm install use-clean-effect
```

or

```sh
yarn add use-clean-effect
```

## Usage

`useCleanEffect` strives to preserve the usage interface of React's `useEffect`.
You can essentially swap `useCleanEffect` with  React's `useEffect` without any change in your codebase.

However, if you want to leverage on the extra feature offered by `useCleanEffect` you can access the extra argument passed to the `useCleanEffect` callback like so:

```js
import { useCleanEffect } from 'use-clean-effect'

useCleanEffect((phase) => {
    // an asynchronous call
    someHttpRequest().then((data) => {
        if (!phase.active) {
            // component has been unmounted/re-rendered so we abort to avouid memory-leak
            return
        }

        // go ahead to use data since then component has not been unmounted/re-rendered
        ...
    })
}, [])
```

The `phase` argument is an object that contains a boolean field `active` which has the value `true` if the component hasn't been unmounted or re-rendered since the `useEffect` callback was triggered. And is `false` otherwise (in which case, we should abort the function to avoid memory leak).

### Additional clean-up Function

For most cases you won't need to add a clean up function to your `useCleanEffect` callback, since it implicitly handles the clean-up logic. However, if your use-case requires that you specifically handle a clean-up logic, you can still return your clean-up function the way you would do it for React's `useEffect`.

```js
import { useCleanEffect } from 'use-clean-effect'

useCleanEffect((phase) => {
    // an async call
    someHttpRequest().then((data) => {
        // ...
    })

    const customCleanUpFunction = () => {
        // custom clean-up logic here
    }

    return customCleanUpFunction
}, [])
```

If you would like to swap all occurrences of React's `useEffect` with `useCleanEffect` without much modification, you can simply import `useCleanEffect` using the `as` keyword like so:

```js
import { useCleanEffect as useEffect } from 'use-clean-effect'
// and then delete occurrences of `import { useEffect } from 'react'`
```

## License

[The MIT License](LICENSE).
