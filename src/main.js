import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from "@/mixin"

import PrimeVue from 'primevue/config'
import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import InputText from "primevue/inputtext"
import Password from "primevue/password"
import Button from "primevue/button"
import SelectButton from "primevue/selectbutton"
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Toast from "primevue/toast"
import ToastService from "primevue/toastservice"
import Dialog from "primevue/dialog"
import Dropdown from "primevue/dropdown"
import MultiSelect from "primevue/multiselect"
import Checkbox from "primevue/checkbox"
import Tag from "primevue/tag"
import Paginator from "primevue/paginator"

const app = createApp(App)

app.component(InputText.name, InputText)
app.component(Password.name, Password)
app.component(Button.name, Button)
app.component(SelectButton.name, SelectButton)
app.component(DataTable.name, DataTable)
app.component(Column.name, Column)
app.component(Toast.name, Toast)
app.component("PopUp", Dialog)
app.component(Dropdown.name, Dropdown)
app.component(MultiSelect.name, MultiSelect)
app.component(Checkbox.name, Checkbox)
app.component(Tag.name, Tag)
app.component(Paginator.name, Paginator)

app.use(store).use(router).use(PrimeVue).use(ToastService)
app.mixin(mixin)
app.mount('#app')
