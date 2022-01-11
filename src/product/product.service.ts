import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dto/product.dto';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async getProducts(): Promise<Product[]>{
        const products = await this.productModel.find()
        return products;
    }

    async getProductById(productId: string): Promise<Product>{
        const product = await this.productModel.findById(productId);
        return product;
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        const newProduct = new this.productModel(createProductDTO);
        return await newProduct.save();
    }

    async deleteProductById(productId: string): Promise<Product>{
        const deletedProduct = await this.productModel.findByIdAndDelete(productId);
        return deletedProduct;
    }

    async updateProduct(productId: string, createProductDTO: CreateProductDTO): Promise<Product>{
        const updatedProduct = await this.productModel.findByIdAndUpdate(productId, createProductDTO, { new: true });
        return updatedProduct;
    }
}
