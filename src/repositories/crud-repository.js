const { where } = require('sequelize')
const logger =require('../config/logger-config')

class CrudRepository
{
    constructor(model)
    {
        this.model=model
    }

    async create(data)
    {
        // Create a new user
        try {
            const response=await this.model.create(data)
            return response
        } catch (error) {
            logger.error(`something went wrong in create function ${error}`)
            throw error
        }
    }

   async getAll()
    {
        try {
            const response=await this.model.findAll()
            return response
        } catch (error) {
            logger.error(`something went wrong in getAll function ${error}`)
            throw error
        }
    }

    async get(primaryKey)
    {
        try {
            const response=await this.model.findByPk(primaryKey)
            return response
        } catch (error) {
            logger.error(`something went wrong in get function ${error}`)
            throw error
        }
    }

    async update(key,data)
    {
        try {
            const response = await this.model.findByPk(key)
            if(response)
            {
                await this.model.update(
                    data,
                    {
                        where:{
                            id:key
                        }
                    }
                )
                return this.model.findByPk(key);
                // await User.update(
                //     { lastName: 'Doe' },
                //     {
                //       where: {
                //         lastName: null,
                //       },
                //     },
                //   );
            }
            logger.info(`model with ${key} not found`)
            throw {message:"not found"}
        } catch (error) {
            logger.error(`something went wrong in update function ${error}`)
            throw error
        }
    }

    async delete(key)
    {
        try {
            const response = this.model.findByPk(key)
            if(response)
            {
                this.model.destroy({
                    where:{
                        id:key
                    }
                })
                return response
                // ost.destroy({
                //     where: {
                //       authorId: {
                //         [Op.or]: [12, 13],
                //       },
                //     },
                //   });
            }


            logger.info(`model with ${key} not found`)
            throw {message:"not found"}
        } catch (error) {
            logger.error(`something went wrong in delete function ${error}`)
            throw error
        }
    }


}

module.exports={
    CrudRepository
}