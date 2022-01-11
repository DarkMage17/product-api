import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Post()
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO): Promise<CreateProductDTO>{
        const product = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Product created successfully',
            product
        });
    }

    @Get()
    async getProducts(@Res() res): Promise<CreateProductDTO[]>{
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json({
            message: 'Products',
            products
        });
    }

    @Get('/:productId')
    async getProductById(@Res() res, @Param('productId') productId: string): Promise<CreateProductDTO>{
        const product = await this.productService.getProductById(productId);
        if(!product) throw new NotFoundException('Product does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Product obtained',
            product
        });
    }

    @Delete('/:productId')
    async deleteProductById(@Res() res, @Param('productId') productId: string): Promise<CreateProductDTO>{
        const deletedProduct = await this.productService.deleteProductById(productId);
        if(!deletedProduct) throw new NotFoundException('Product does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Product deleted',
            deletedProduct
        });
    }

    @Put('/:productId')
    async updateProduct(@Res() res, @Param('productId') productId, @Body() createProductDTO:CreateProductDTO){
        const updatedProduct = await this.productService.updateProduct(productId, createProductDTO);
        if(!updatedProduct) throw new NotFoundException('Product does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Product updated successfully',
            updatedProduct
        });
    }
}