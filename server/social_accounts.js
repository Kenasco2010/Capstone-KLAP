createServiceConfiguration = function(service, clientId, secret) {
  var config;
  ServiceConfiguration.configurations.remove({
    service: service
  });
  config = {
    generic: {
      service: service,
      clientId: clientId,
      secret: secret
    },
    facebook: {
      service: service,
      appId: clientId,
      secret: secret
    },
    twitter: {
      service: service,
      consumerKey: clientId,
      secret: secret
    }
  };
  switch (service) {
    case 'facebook':
      return ServiceConfiguration.configurations.insert(config.facebook);
    case 'twitter':
      return ServiceConfiguration.configurations.insert(config.twitter);
    default:
      return ServiceConfiguration.configurations.insert(config.generic);
  }
};

createServiceConfiguration('facebook', '348779841999000', '452b7cc3a6c08a697cc6f9e887b8e0da')
createServiceConfiguration('google', '410884025676-kf5kf6ns6kn61vcms109pv5acg3unbvf.apps.googleusercontent.com', 'gMqoFhmeSRqvPiiE9OdNrrMS')
