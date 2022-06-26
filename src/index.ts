import { useEffect, DependencyList } from 'react'

type EffectStatus = { active: boolean }
type Destructor = () => void
type EffectCallback = (phase: EffectStatus) => void | Destructor

/**
 * This essentially behaves the same way as React's useEffect function,
 * except for the fact that it comes built-in with a simple clean-up function, so for the
 * most part, you may not need to return a clean-up function in your useEffect callback.
 *
 * @param {EffectCallback} effect this is the callback to run like with react's useEffect except
 * this takes an object as argument which contains a boolean indicating if the component has been unmounted
 * or re-rendered since the callback was last invoked.
 * @param {DependencyList} deps the dependency list as with React's useEffect.
 */
export function useCleanEffect(effect: EffectCallback, deps: DependencyList) {
    useEffect(() => {
        const effectStatus = { active: true }
        const extraCleanupFunction = effect(effectStatus)

        return () => {
            effectStatus.active = false
            if (typeof extraCleanupFunction === 'function') {
                extraCleanupFunction()
            }
        }
    }, deps)
}

