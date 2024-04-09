import Service from '../models/Service.js';
import Rating from '../models/Service.js'

export const getAllServices = async (req, res) => {
  try {
    // Fetch all services from the database
    const services = await Service.find();

    // Iterate through each service and calculate its average rating
    for (const service of services) {
      // Calculate the average rating if the service has been rated
      if (service.ratingsCount > 0) {
        service.averageRating = service.rating / service.ratingsCount;
      } else {
        service.averageRating = 0;
      }
    }

    // Send the services with average ratings in the response
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const createService = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the entire request body
    const { userId } = req.body; // Access userId directly from req.body
    console.log('userId:', userId); // Log the userId extracted from req.body
    const newService = new Service({ ...req.body, userId }); // Include userId when creating newService
    console.log('New service:', newService); // Log the newService object
    const savedService = await newService.save();
    res.json(savedService);
  } catch (err) {
    console.error('Error:', err); // Log any errors that occur
    res.status(500).json({ error: err.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(updatedService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Controller logic to handle rating a service
export const rateService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { userId, rating } = req.body;

    // Retrieve the service from the database
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Calculate the new average rating
    const currentTotalRating = service.rating * service.ratingsCount;
    const newTotalRating = currentTotalRating + rating;
    const newRatingsCount = service.ratingsCount + 1;
    const newAverageRating = newTotalRating / newRatingsCount;

    // Update the service with the new rating information
    service.rating = newAverageRating;
    service.ratingsCount = newRatingsCount;
    await service.save();

    res.json({ message: 'Rating saved successfully' });
  } catch (error) {
    console.error('Error rating service:', error);
    res.status(500).json({ error: 'Failed to rate service' });
  }
};


// Controller logic to get the average rating for a service
export const getAverageRating = async (req, res) => {
  try {
    const { serviceId } = req.params;

    // Fetch all ratings for the service from the database
    const ratings = await Rating.find({ serviceId });

    // Calculate the average rating
    let totalRating = 0;
    ratings.forEach((rating) => {
      totalRating += rating.rating;
    });
    const averageRating = ratings.length > 0 ? totalRating / ratings.length : 0;

    res.json({ averageRating }); // Return the average rating
  } catch (error) {
    console.error('Error getting average rating:', error);
    res.status(500).json({ error: 'Failed to get average rating' });
  }
};


