import {NavigationActions, StackActions} from 'react-navigation'
import {autorun} from 'mobx'
import BasicStore from './basic-store'

class NavigationStore extends BasicStore {
    ref = null

    setNavRef = ref => {
        this.ref = ref
        this.onReady()
    }

    onReady = () => {
        let firstRun = true
        autorun(() => {
            const screen = this.getStore('auth').user
                ? 'lists'
                : 'auth'

            if (!firstRun) this.reset(screen)
            firstRun = false
        })
    }

    goTo = (routeName, params) => this.ref.dispatch(NavigationActions.navigate({
        routeName, params
    }))

    reset = routeName => this.ref.dispatch(StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName })
        ]
    }))
}

export default NavigationStore