FROM quay.io/wildfly/wildfly:latest

WORKDIR /opt/jboss/wildfly

COPY target/WEB4.war /opt/jboss/wildfly/standalone/deployments/ROOT.war

EXPOSE 8080

CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0"]
