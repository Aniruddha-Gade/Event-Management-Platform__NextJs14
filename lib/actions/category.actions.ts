'use server'

import { CreateCategoryParams } from '@/types'
import { handleError } from '../utils'
import { connectToDatabase } from '../database'
import Category from '../database/models/category.model'


// ******************** create Category ********************
export const createCategory = async ({ categoryName }: CreateCategoryParams) => {
    try {
        await connectToDatabase();

        const newCategory = await Category.create({ name: categoryName });

        return JSON.parse(JSON.stringify(newCategory));
    }

    catch (error) {
        handleError(error)
    }
}


// ******************** get All Categories ********************
export const getAllCategories = async () => {
    try {
        await connectToDatabase();

        const allCategories = await Category.find();

        return JSON.parse(JSON.stringify(allCategories));
    }

    catch (error) {
        handleError(error)
    }
}