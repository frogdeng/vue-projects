<template>
    <div class="">
        <loading :active.sync="isLoading"></loading>   
        <div class="row mt-4">
        <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
            <div class="card border-0 shadow-sm" >
                <div style="height: 200px; background-size: cover; background-position: top"
                :style="{backgroundImage: `url(${item.imageUrl})`}">
                </div>
                <div class="card-body">
                <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                <h5 class="card-title">
                    <a href="#" class="text-dark">{{ item.title }}</a>
                </h5>
                <p class="card-text">{{ item.content }}</p>
                <div class="d-flex justify-content-between align-items-baseline">
                    <!-- <div class="h5">2,800 元</div> -->
                    <del class="h6">原價 {{ item.origin_price }} 元</del>
                    <div class="h5">現在只要 {{ item.price }} 元</div>
                </div>
                </div>
                <div class="card-footer d-flex">
                <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                    <i class="fas fa-spinner fa-spin" v-if='status.loadingItem === item.id'></i>
                    查看更多
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
                @click="addToCard(item.id)">
                    <i class="fas fa-spinner fa-spin" v-if='status.loadingItem === item.id'></i>
                    加到購物車
                </button>
                </div>
            </div>
        </div>

        <!-- cart -->
            <div class="cart-section">
            <table class="table">
                <thead>
                    <th></th>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                </thead>
                <tbody>
                    <tr v-for="item in cart.carts">
                    <td class="align-middle">
                        <button type="button" class="btn btn-outline-danger btn-sm" 
                        @click="removeCartItem(item.id)">
                        <i class="far fa-trash-alt"></i>
                        </button>
                    </td>
                    <td class="align-middle">
                        {{ item.product.title }}
                        <!-- <div class="text-success" v-if="item.coupon">
                        已套用優惠券
                        </div> -->
                    </td>
                    <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="align-middle">{{ item.final_total }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr >
                    <td colspan="3" class="text-right">總計</td>
                    <td class="text-right">{{ cart.total }}</td>
                    </tr>
                    
                    <tr v-if="cart.final_total != cart.total">
                    <td colspan="3" class="text-right text-success">折扣價</td>
                    <td class="text-right text-success">{{ cart.final_total }}</td>
                    </tr>
                </tfoot>
                </table>
                <div class="input-group mb-3 input-group-sm">
                <input type="text" class="form-control" v-model="coupon_code"  placeholder="請輸入優惠碼">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click=" addCouponCode()">
                    套用優惠碼
                    </button>
                </div>
                </div>
            </div>


        <!-- modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img :src="product.imageUrl" class="img-fluid" alt="">
                    <blockquote class="blockquote mt-3">
                    <p class="mb-0">{{ product.content }}</p>
                    <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                    </blockquote>
                    <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                    <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                    <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
                    </div>
                    <select name="" class="form-control mt-3" v-model="product.num">
                    <option :value="num" v-for="num in 10" :key="num">
                        選購 {{num}} {{product.unit}}
                    </option>
                    </select>
                </div>
                <div class="modal-footer">
                    <div class="text-muted text-nowrap mr-3">
                    小計 <strong>{{ product.num * product.price }}</strong> 元
                    </div>
                    <button type="button" class="btn btn-primary"
                    @click="addToCard(product.id, product.num)">
                    <i class="fas fa-spinner fa-spin" v-if=""></i>
                    加到購物車
                    </button>
                </div>
                </div>
            </div>
            </div>
        <!-- modal -->

        
    </div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    data() {
        return {
            products: [],
            product: {},
            isLoading: false,
            coupon_code:'',
            status:{
                loadingItem: ''
            },
            cart:[],
        };
       
    },
    methods: {
        getProducts(){
            const vm = this;
            let api = `https://vue-course-api.hexschool.io/api/frogdeng/products`;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log(response.data)
                vm.products = response.data.products;
                vm.isLoading = false;
            });
        },

        getProduct(id){
            const vm = this;
            let api = `https://vue-course-api.hexschool.io/api/frogdeng/product/${id}`;
            vm.status.loadingItem = id;
            this.$http.get(api).then((response) => {
                console.log(response.data)
                vm.product = response.data.product;
                $('#productModal').modal('show');
                vm.status.loadingItem = ''
            });    
        },
        addToCard(id, qty = 1){
            const vm = this;
            let api = `https://vue-course-api.hexschool.io/api/frogdeng/cart`; 
            vm.status.loadingItem = id;
            const cart = {
                product_id:id,
                qty,
            };
            this.$http.post(api,{data: cart}).then((response) => {
                console.log(response.data)
                vm.status.loadingItem = ''
                vm.getCart() //加入購物車後，取的所有購物車資料
                $('#productModal').modal('hide');
            });    
        },
        getCart(){
            const vm = this;
            let api = `https://vue-course-api.hexschool.io/api/frogdeng/cart`;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                vm.cart = response.data.data;
                // console.log(response.data.data)
                vm.isLoading = false;
            });        
        },
        removeCartItem(id){
            const vm = this;
            let api = `https://vue-course-api.hexschool.io/api/frogdeng/cart/${id}`;
            vm.isLoading = true;
            this.$http.delete(api).then((response) => {
                // vm.cart = response.data.data;
                console.log(response.data)
                vm.isLoading = false;
                this.getCart();
                vm.isLoading = true;
            });    
        },
        addCouponCode(){
            const vm = this;
            let api = `https://vue-course-api.hexschool.io/api/frogdeng/coupon`;
            const coupon = {
                code: vm.coupon_code
            }
            vm.isLoading = true;
            this.$http.post(api, {data:coupon}).then((response) => {
                console.log(response)
                vm.isLoading = false;
            });    
        },
    
    },
    created() {
        this.getProducts();
        this.getCart();
    }
}
</script>


<style lang="sass">
    .cart-section
        width: 80%
        margin: 50px auto
        clear: both
</style>